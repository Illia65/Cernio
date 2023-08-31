const tabsBtn = document.querySelectorAll('.tabs__nav-btn')
const tabsItems = document.querySelectorAll('.tabs__item')
const loader = document.getElementById('loader')
const popup = document.getElementById('popup')
const popupContent = document.querySelector('.popup-content')
const closePopup = document.querySelector('.close-popup')

closePopup.addEventListener('click', () => {
	popup.style.display = 'none'
})

const onTabClick = item => {
	item.addEventListener('click', () => {
		let currentBtn = item
		let tabId = currentBtn.getAttribute('data-tab')
		let currentTab = document.querySelector(tabId)

		if (!currentBtn.classList.contains('active')) {
			tabsBtn.forEach(item => {
				item.classList.remove('active')
			})

			tabsItems.forEach(item => {
				item.classList.remove('active')
			})

			currentBtn.classList.add('active')
			currentTab.classList.add('active')
		}
	})
}

tabsBtn.forEach(onTabClick)

document.querySelector('.tabs__nav-btn').click()

const createTabPeople = data => {
	return `
	<div class="tab__item">
		<div class="tab__img">
			<img src="./img/no-img.jpg" alt="no-img" />
		</div>
		<div class="tab__info">
			<div class="flex mb15">
				<div class="tab__name">Name: ${data.name}</div>
				<div class="tab__height">Height: ${data.height}</div>
			</div>
			<div class="flex">
				<div class="tab__skin_color">Skin color: ${data.skin_color}</div>
				<div class="tab__created">Сreated ${data.created}</div>
			</div>

			<button class="open-popup-button">Открой меня</button>
		</div>
	</div>`
}

const createTabPlanets = data => {
	return `
	<div class="tab__item">
		<div class="tab__img">
			<img src="./img/no-img.jpg" alt="no-img" />
		</div>
		<div class="tab__info">
			<div class="mb15">
				<div class="tab__name">Name: ${data.name}</div>
				<div class="tab__height">Terrain: ${data.terrain}</div>
			</div>
			<div class="flex">
				<div class="tab__skin_color">Climate: ${data.climate}</div>
				<div class="tab__created">Diameter: ${data.diameter}</div>
			</div>

			<button class="open-popup-button">Открой меня</button>
		</div>
	</div>`
}

const createTabFilms = data => {
	return `
	<div class="tab__item">
		<div class="tab__img">
			<img src="./img/no-img.jpg" alt="no-img" />
		</div>
		<div class="tab__info">
			<div class="mb15">
				<div class="tab__name">Name: ${data.title}</div>
				<div class="tab__height">Director: ${data.director}</div>
			</div>
			<div class="flex">
				<div class="tab__skin_color">Release: ${data.release_date}</div>
				<div class="tab__created">Created: ${data.created}</div>
			</div>

			<button class="open-popup-button">Открой меня</button>
		</div>
	</div>`
}

function showLoader() {
	loader.style.display = 'flex'
}

function hideLoader() {
	loader.style.display = 'none'
}

function addPopupHandlers(results, type) {
	const openPopUpBtns = document.querySelectorAll('.open-popup-button')

	openPopUpBtns.forEach((button, index) => {
		button.addEventListener('click', () => {
			openPopUp(results[index], type)
		})
	})
}

const fetchPeople = () => {
	showLoader()

	const apiUrl = 'https://swapi.dev/api/people/?format=json'

	fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
			const peopleBlock = document.getElementById('people')
			peopleBlock.innerHTML = ''

			data.results.forEach(el => {
				const tabItemHTML = createTabPeople(el)
				peopleBlock.innerHTML += tabItemHTML
			})

			addPopupHandlers(data.results, 'people')

			hideLoader()
		})
		.catch(error => {
			console.log('Ошибка при выполнении запроса:', error)
			hideLoader()
		})
}

const fetchPlanets = () => {
	showLoader()

	const apiUrl = 'https://swapi.dev/api/planets/?format=json'

	fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
			const peopleBlock = document.getElementById('planets')
			peopleBlock.innerHTML = ''

			data.results.forEach(el => {
				const tabItemHTML = createTabPlanets(el)
				peopleBlock.innerHTML += tabItemHTML
			})

			addPopupHandlers(data.results, 'planets')

			hideLoader()
		})
		.catch(error => {
			console.log('Ошибка при выполнении запроса:', error)
			hideLoader()
		})
}

const fetchFilms = () => {
	showLoader()

	const apiUrl = 'https://swapi.dev/api/films/?format=json'

	fetch(apiUrl)
		.then(res => res.json())
		.then(data => {
			const peopleBlock = document.getElementById('films')
			peopleBlock.innerHTML = ''

			data.results.forEach(el => {
				const tabItemHTML = createTabFilms(el)
				peopleBlock.innerHTML += tabItemHTML
			})

			addPopupHandlers(data.results, 'films')

			hideLoader()
		})
		.catch(error => {
			console.log('Ошибка при выполнении запроса:', error)
			hideLoader()
		})
}

const openPopUp = (data, type) => {
	let popupHTML = ''

	if (type === 'people') {
		popupHTML = `
					<div>Name: ${data.name}</div>
					<div>Height: ${data.height}</div>
					<div>Mass: ${data.mass}</div>
					<div>Hair Color: ${data.hair_color}</div>
					<div>Skin Color: ${data.skin_color}</div>
					<div>Eye Color: ${data.eye_color}</div>
					<div>Birth Year: ${data.birth_year}</div>
					<div>Gender: ${data.gender}</div>
					<div>Homeworld: ${data.homeworld}</div>
			`
	}

	if (type === 'planets') {
		popupHTML = `
					<div>Name: ${data.name}</div>
					<div>Rotation Period: ${data.rotation_period}</div>
					<div>Orbital Period: ${data.orbital_period}</div>
					<div>Diameter: ${data.diameter}</div>
					<div>Climate: ${data.climate}</div>
					<div>Gravity: ${data.gravity}</div>
					<div>Terrain: ${data.terrain}</div>
					<div>Surface Water: ${data.surface_water}</div>
					<div>Population: ${data.population}</div>
			`
	}

	if (type === 'films') {
		popupHTML = `
			<div>Title: ${data.title}</div>
			<div>Episode ID: ${data.episode_id}</div>
			<div>Opening Crawl: ${data.opening_crawl}</div>
			<div>Director: ${data.director}</div>
			<div>Producer: ${data.producer}</div>
			<div>Release Date: ${data.release_date}</div>
			<div>Created: ${data.created}</div>
			`
	}

	popupContent.innerHTML = popupHTML
	popup.style.display = 'block'
}

fetchPeople()
fetchPlanets()
fetchFilms()
