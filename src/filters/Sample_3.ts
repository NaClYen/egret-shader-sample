/**
 * 抽象控制, 模擬成未來實際使用類別物件的狀態
 */
class Sample_3 {
    public static async applyFilter(target: egret.DisplayObject) {
        const vertFilePath = "./src/filters/test/vert.glsl";
        const fragFilePath = "./src/filters/test/frag.glsl";

        const loadFileText = (file: string, cb: (text: string) => void) => {
            return fetch(file)
                .then((r) => r.text())
                .then(cb);
        };

        // load scripts
        let vertScript: string;
        let fragScript: string;
        await loadFileText(vertFilePath, (t) => (vertScript = t));
        await loadFileText(fragFilePath, (t) => (fragScript = t));

        // console.log(`vertScript: ${vertScript}`);
        // console.log(`fragScript: ${fragScript}`);

        // 產生自製濾鏡
        const filter = new egret.CustomFilter(vertScript, fragScript, { brightness: 0.5 });

        // 操作用物件
        const brightnessPropName = "brightness";
        return {
            // 濾鏡開關
            get enable() {
                return target.filters && target.filters.length > 0;
            },
            set enable(val: boolean) {
                if (val) {
                    target.filters = [filter];
                } else {
                    target.filters = undefined;
                }
            },

            // 亮度參數
            get brightness(): number {
                return filter.uniforms[brightnessPropName];
            },
            set brightness(val: number) {
                filter.uniforms[brightnessPropName] = val;
            }
        };
    }
}
