# База данных студентов

### Ссылки
- [https://students-api.now.sh](https://students-api.now.sh) - апи
- [https://students-bd.now.sh](https://students-bd.now.sh) - приложение

### Инструкция для деплоя
1. Апи
- `cd api`
- Взять у автора файл `.env` и заменить
- `now --npm --public` (копируем урл)
2. Приложение
- `cd app`
- Заменяем урл в `./src/config.json` на `${урл апи}/places`
- `now --npm --public`

### Документация к апи
1. Создание студента
- Адрес: `/places`
- HTTP-метод: `POST`
- Содержимое тела запроса: `{ name - строка, surname - строка, rating - целое число, от 0 до 100}`
- return: Созданный студент

2. Получить всех студентов
- Адрес: `/places`
- HTTP-метод: `GET`
- return: Массив всех студентов

3. Получить студента по _id
- Адрес: `/places/<id>`
- HTTP-метод: `GET`
- return: Студент

4. Изменить студента
- Адрес: `/places/edit/<id>`
- HTTP-метод: `PUT`
- Содержимое тела запроса: `{ name - строка, surname - строка, rating - целое число, от 0 до 100}`
- return: Изменённый студент

5. Удалить всех студентов
- Адрес: `/places/<id>`
- HTTP-метод: `DELETE`
- return: Статус операции

6. Удалить студента по _id
- Адрес: `/places/<id>`
- HTTP-метод: `DELETE`
- return: Статус операции
