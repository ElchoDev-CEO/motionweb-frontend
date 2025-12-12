import confetti from 'canvas-confetti'; // Функция для School Pride

export const launchSchoolPride = () => {
	const duration = 2 * 1000; // Продолжительность анимации в миллисекундах
	const end = Date.now() + duration;
	const colors = ['#ff0000', '#ffffff']; // Цвета конфетти для школы

	function frame() {
		confetti({
			particleCount: 2,
			angle: 60,
			spread: 55,
			origin: { x: 0 }, // Левая сторона экрана
			colors: colors
		});
		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			origin: { x: 1 }, // Правая сторона экрана
			colors: colors
		});

		// Проверяем, закончилась ли анимация
		if (Date.now() < end) {
			requestAnimationFrame(frame);
		}
	}

	// Запуск анимации
	frame();
};

// Функция для запуска фейерверка
export const launchFireworks = () => {
	const duration = 5 * 1000;
	const animationEnd = Date.now() + duration;
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

	function randomInRange(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	const interval: any = setInterval(() => {
		const timeLeft = animationEnd - Date.now();

		if (timeLeft <= 0) {
			return clearInterval(interval);
		}

		const particleCount = 50 * (timeLeft / duration);
		// Запускаем конфетти с разных сторон экрана
		confetti({
			...defaults,
			particleCount,
			origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
		});
		confetti({
			...defaults,
			particleCount,
			origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
		});
	}, 250);
};
