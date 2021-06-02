// 直接寫死在 script 內
class Sample_1 {
    public static async applyFilter(target: egret.DisplayObject) {
        const vertScript = `attribute vec2 aVertexPosition;
            attribute vec2 aTextureCoord;
            attribute vec2 aColor;
            
            uniform vec2 projectionVector;
            
            varying vec2 vTextureCoord;
            varying vec4 vColor;
            
            const vec2 center = vec2(-1.0, 1.0);
            
            void main(void) {
                gl_Position = vec4((aVertexPosition / projectionVector) + center, 0.0, 1.0);
                vTextureCoord = aTextureCoord;
                vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);
            }`;

        const fragScript = `precision lowp float;
            varying vec2 vTextureCoord;
            varying vec4 vColor;
            uniform sampler2D uSampler;
            uniform float brightness;
            
            void main(void) {
                vec4 color = texture2D(uSampler, vTextureCoord) * vColor;
                gl_FragColor = vec4((color.rgb + vec3(brightness)), color.a);
            }`;

        // 產生自製濾鏡
        const filter = new egret.CustomFilter(vertScript, fragScript, { brightness: 0 });
        // 套用濾鏡
        target.filters = [filter];
    }
}
