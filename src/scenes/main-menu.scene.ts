export class MainMenuScene {
	constructor() {
		onKeyPress(["d"], () => {
			if (isKeyDown("shift")) {
				debug.inspect = !debug.inspect;
			}
		});

		this.buildMenu();
	}

	private buildMenu(): void {
		add([rect(width(), height()), color(25, 25, 25)]);
	}
}
