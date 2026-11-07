'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { gsap, motionOn } from '@/lib/motion'

const vertex = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`

const fragment = `
precision mediump float;
uniform vec2 uPointer;
uniform float uTime;
uniform float uCell;
uniform float uFade;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 cell = floor(px / uCell);
  vec2 center = (cell + 0.5) * uCell;

  float wave = noise(cell * 0.09 + vec2(uTime * 0.12, -uTime * 0.08));
  float near = smoothstep(uCell * 8.0, 0.0, distance(center, uPointer));
  float radius = uCell * (0.05 + 0.15 * wave * wave + 0.17 * near);
  float dotMask = 1.0 - smoothstep(radius - 1.0, radius + 0.5, distance(px, center));

  vec3 base = mix(vec3(1.0), vec3(0.208, 0.878, 0.761), smoothstep(0.56, 0.78, wave));
  vec3 color = mix(base, vec3(0.945, 0.188, 0.141), near);
  float alpha = dotMask * (0.07 + 0.3 * wave + 0.62 * near) * uFade;
  gl_FragColor = vec4(color * alpha, alpha);
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

/**
 * A GPU dot matrix behind the hero. The CSS dot grid underneath stays visible without WebGL,
 * and on machines with no real GPU, where a full-screen shader would cost scroll smoothness.
 */
export default function DotField({ paused }: { paused: RefObject<boolean> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' })
    if (!canvas || !gl) return

    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
    if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) return

    const vs = compile(gl, gl.VERTEX_SHADER, vertex)
    const fs = compile(gl, gl.FRAGMENT_SHADER, fragment)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uPointer = gl.getUniformLocation(program, 'uPointer')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uCell = gl.getUniformLocation(program, 'uCell')
    const uFade = gl.getUniformLocation(program, 'uFade')

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const calm = !motionOn()
    const target = { x: -9999, y: -9999 }
    const pointer = { x: -9999, y: -9999 }
    let fade = calm ? 1 : 0
    let visible = true

    const draw = (time: number) => {
      pointer.x += (target.x - pointer.x) * 0.12
      pointer.y += (target.y - pointer.y) * 0.12
      fade = Math.min(1, fade + 0.015)
      gl.uniform2f(uPointer, pointer.x, pointer.y)
      gl.uniform1f(uTime, time)
      gl.uniform1f(uCell, 26 * dpr)
      gl.uniform1f(uFade, fade)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      draw(0)
    }
    const sizeObserver = new ResizeObserver(resize)
    sizeObserver.observe(canvas)
    resize()

    if (calm) return () => sizeObserver.disconnect()

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      target.x = (e.clientX - rect.left) * dpr
      target.y = (rect.bottom - e.clientY) * dpr
      if (pointer.x < -999) {
        pointer.x = target.x
        pointer.y = target.y
      }
    }
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    viewObserver.observe(canvas)

    const tick = (time: number) => {
      if (visible && !paused.current && !document.hidden) draw(time)
    }
    gsap.ticker.add(tick)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('pointermove', onMove)
      sizeObserver.disconnect()
      viewObserver.disconnect()
    }
  }, [paused])

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
}
