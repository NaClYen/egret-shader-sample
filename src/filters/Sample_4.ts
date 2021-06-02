/**
 * 加入重載 shader & 立即反應
 */
class Sample_4 {
    public static async applyFilter(target: egret.DisplayObject) {
        const vertFilePath = "./src/filters/test/vert.glsl";
        const fragFilePath = "./src/filters/test/frag.glsl";

        const loadFileText = (file: string, cb: (text: string) => void) => {
            return fetch(file)
                .then((r) => r.text())
                .then(cb);
        };

        let vertScript: string;
        let fragScript: string;

        // load scripts
        const loadSahder = async () => {
            await loadFileText(vertFilePath, (t) => (vertScript = t));
            await loadFileText(fragFilePath, (t) => (fragScript = t));
        };

        await loadSahder();

        // console.log(`vertScript: ${vertScript}`);
        // console.log(`fragScript: ${fragScript}`);

        // 產生自製濾鏡
        let filter = new egret.CustomFilter(vertScript, fragScript, { brightness: 0.5 });

        // 操作用物件
        const brightnessPropName = "brightness";
        const operator = {
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
            },

            // 重載 shader
            async reload() {
                const enabled = operator.enable;

                // 關閉濾鏡
                operator.enable = false;

                await loadSahder();

                filter = new egret.CustomFilter(vertScript, fragScript, filter.uniforms);

                // 恢復設定
                operator.enable = enabled;
            }
        };

        return operator;
    }
}
