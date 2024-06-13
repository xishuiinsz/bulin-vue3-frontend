import { Color } from "three";
export class DiffuseShader {
  constructor({
    material,
    time,
    size,
    diffuseColor,
    diffuseSpeed,
    diffuseWidth,
  }) {
    this.time = time;
    let defaultOptions = {
      size: 100,
      diffuseSpeed: 15.0,
      diffuseColor: 0x8e9b9e,
      diffuseWidth: 10.0,
    };
    this.options = Object.assign({}, defaultOptions, {
      material,
      size,
      diffuseColor,
      diffuseSpeed,
      diffuseWidth,
    });
    this.init();
  }
  init() {
    let pointShader = null;
    let { material, size, diffuseColor, diffuseSpeed, diffuseWidth } =
      this.options;

    let maxTime = size / diffuseSpeed;

    material.onBeforeCompile = (shader) => {
      pointShader = shader;
      shader.uniforms = {
        ...shader.uniforms,
        uTime: {
          value: 0.0,
        },
        uSpeed: {
          value: diffuseSpeed,
        },
        uWidth: {
          value: diffuseWidth,
        },
        uColor: {
          value: new Color(diffuseColor),
        },
      };
      shader.vertexShader = shader.vertexShader.replace(
        "void main() {",
        /* glsl */ `
            varying vec3 vPosition;
            void main(){
              vPosition = position;
          `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        /* glsl */ `
            uniform float uTime;
            uniform float uSpeed;
            uniform float uWidth;
            uniform vec3 uColor;
            varying vec3 vPosition;
            void main(){
          `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <opaque_fragment>",
        /* glsl */ `
            #ifdef OPAQUE
            diffuseColor.a = 1.0;
            #endif
            
            #ifdef USE_TRANSMISSION
            diffuseColor.a *= material.transmissionAlpha;
            #endif
            
            float r = uTime * uSpeed;
          
            float w = 0.0; 
            if(w>uWidth){
              w = uWidth;
            }else{
              w = uTime * 5.0;
            }
           
            vec2 center = vec2(0.0, 0.0); 
           
            float rDistance = distance(vPosition.xz, center);
            
            if(rDistance > r && rDistance < r + 2.0 * w) {
              float per = 0.0;
              if(rDistance < r + w) {
                per = (rDistance - r) / w;
                outgoingLight = mix(outgoingLight, uColor, per);
              } else {
                per = (rDistance - r - w) / w;
                outgoingLight = mix(uColor, outgoingLight, per);
              }
              gl_FragColor = vec4(outgoingLight, diffuseColor.a);
            } else {
              gl_FragColor = vec4(outgoingLight, 0.0);
            }
          `
      );
    };

    this.time.on("tick", (deltaTime) => {
      if (pointShader) {
        pointShader.uniforms.uTime.value += deltaTime;
        if (pointShader.uniforms.uTime.value > maxTime) {
          pointShader.uniforms.uTime.value = 0;
        }
      }
    });
  }
}
