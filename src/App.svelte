<script>
	export let name;
	export let apiKey;
	export let location;
	export let columns;
	export let doubleSpacedList;
	
	let d = new Date();
	$: hours = format_two_digits(d.getHours() % 12 === 0 ? 12 : d.getHours() % 12);
	$: minutes = format_two_digits(d.getMinutes());
	$: date = d.toLocaleDateString('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
	$: greeting = d.getHours() < 12 ? 'morning' : d.getHours() < 18 ? 'afternoon' : 'evening';

	let version;
	fetch(`manifest.json`)
	.then(res => res.json())
	.then((out) => {
		version = out.version;
		console.log(out);
	});

	let weather;
	let weatherClass = "none";
	let temperature = 0;
	updateWeather();

	function updateWeather() {
		if (apiKey && location) {
			fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
				.then(res => res.json())
				.then((out) => {
					weather = out;
					console.log(weather);
					temperature = Math.round(weather.main.temp);
					if (weather.weather[0].main === "Clear") {
						if (d < weather.sys.sunrise || d > weather.sys.sunset) {
							weatherClass = "moon";
						} else {
							weatherClass = "sun";
						}
					} else if (weather.weather[0].main === "Rain" || weather.weather[0].main === "Drizzle" || weather.weather[0].main === "Thunderstorm") {
						weatherClass = "rain";
					} else if (weather.weather[0].main === "Snow") {
						weatherClass = "snow";
					} else {
						weatherClass = "cloud";
					}
				}).catch((error) => {
					console.log(error);
					weather = null;
				});
		}
	}

	const timeInterval = setInterval(() => {
		d = new Date();
	}, 1000);

	const weatherInterval = setInterval(() => {
		updateWeather();
	}, 600000);

	function format_two_digits(n) {
		return n < 10 ? '0' + n : n;
	}
</script>
<div class="bg-image"></div>
<main>
	<div id="box">
		<div id="image-container">
			
			<div id="time">{hours}-{minutes}</div>
		</div>
		<div id="inner-box">
			{#if name}
				<h1 id="header-1">Good {greeting}, {name}.</h1>
			{:else}
				<h1 id="header-1">Good {greeting}.</h1>
			{/if}
			<br>
			<h2 id="header-2">Today is {date}.</h2>
			<br><br>
			<div id="links">
				{#each columns as column, i}
					<div class="link-column" id="link-column-{i+1}">
						{#each column as {name, url}}
							<a href="{url}" target="_top">
								<span class="arrow">></span> <span class="text">{name}</span>
							</a>
							{#if doubleSpacedList}
								<br>
							{/if}
							<br>
						{/each}
					</div>
				{/each}
				
			</div>
			{#if weather}
				<div id="weather-container">
					<div id="temperature">{temperature}°</div>
					<div class="weather-icon {weatherClass}"></div>
				</div>
			{/if}
		</div>
	</div>
</main>
<div id="version">v{version}</div>