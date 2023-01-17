// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
      return nums.reduce((acc,el)=> acc+el)
}

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number,b: number,c: number): string {

    // В return стоит "заглушка", чтоб typescript не ругался
    return (a+b<=c || b+c<=a || a+c<=b ? '00' :
                a===b && b===c ? '10' :
                  a===b || b===c || c===a ?'01': '11')
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number{
    let str
    let sum=0
    str=String(number).split('')
    for(let i=0; i<str.length; i++)
    {
      sum+=+str[i]
    }

    return sum
}

// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let sum=0
    let sum2=0
    for(let i=0; i<arr.length; i++)
    {
        if(i%2<1 || i===0)
        {
          sum+=arr[i]
        }
        else if(i%2>=1 || i===1)
        sum2+=arr[i]
    }

    return (sum>sum2 ? true : false)
    // В return стоит "заглушка", чтоб typescript не ругался
    return true
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return array.filter(el=>Number.isInteger(el)===true).filter(f=>f>0).map(m=>Math.pow(m,2))

}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    //...здесь пишем код.
    let sum=0
    for(let i=0; i<=N;i++)
    {sum+=i}
    // В return стоит "заглушка", чтоб typescript не ругался
    return sum
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]

    let i=0
    let arr=[]
    do
    {
        if(amountOfMoney>=banknotes[i]){
            amountOfMoney=amountOfMoney-banknotes[i]
            arr.push(banknotes[i])
        }
        else{i++}

    }while (amountOfMoney>0)

    return arr
}

