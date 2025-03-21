const numberInput1 = document.getElementById('#liczba1')
const numberInput2 = document.getElementById('#liczba2')
const numberInput3 = document.getElementById('#liczba3')
const numberInput4 = document.getElementById('#liczba4')

const countButton = document.getElementById('#przelicz')

const resultContainer = document.getElementById('#wyniki')

countButton.addEventListener('click', () => {
    resultContainer.innerHTML = numberInput1.value
})
