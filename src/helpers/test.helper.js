const GET_RETURN = [
  {
    _id: "62b0ee20c9537e27ba3b9bc0",
    fullName: "Heinlein",
    birthday: "2999-01-01T06:00:00.000Z",
    books: [
      {
        title: "Time enough for love",
        publishedAt: "1905-01-01T06:02:04.000Z",
        _id: "62b0ee35c9537e27ba3b9bc4",
      },
    ],
    __v: 1,
  },
  {
    _id: "62b21be059ffd42f24a9ae03",
    fullName: "Dumas111111",
    birthday: "1700-01-01T06:02:04.000Z",
    books: [
      {
        title: "Count of Monte Cristo3",
        publishedAt: "1770-01-01T06:02:04.000Z",
        _id: "62b21be059ffd42f24a9ae04",
      },
      {
        title: "Count of Monte Cristo4",
        publishedAt: "1770-01-01T06:02:04.000Z",
        _id: "62b21be059ffd42f24a9ae05",
      },
    ],
    __v: 0,
  },
];

const GET_ONE_RETURN = {
  _id: "62b0ee20c9537e27ba3b9bc0",
  fullName: "Heinlein",
  birthday: "2999-01-01T06:00:00.000Z",
  books: [
    {
      title: "Time enough for love",
      publishedAt: "1905-01-01T06:02:04.000Z",
      _id: "62b0ee35c9537e27ba3b9bc4",
    },
  ],
  __v: 1,
};

const MANY_BOOKS_RES = [
  {
    title: "Time enough for love",
    publishedAt: "1905-01-01T06:02:04.000Z",
    _id: "62b0ee35c9537e27ba3b9bc4",
  },
  {
    title: "Count of Monte Cristo3",
    publishedAt: "1770-01-01T06:02:04.000Z",
    _id: "62b21be059ffd42f24a9ae04",
  },
  {
    title: "Count of Monte Cristo4",
    publishedAt: "1770-01-01T06:02:04.000Z",
    _id: "62b21be059ffd42f24a9ae05",
  },
];

const ONE_BOOK_RES = {
  title: "Time enough for love",
  publishedAt: "1905-01-01T06:02:04.000Z",
  _id: "62b0ee35c9537e27ba3b9bc4",
};

const ONE_USER = {
  _id: "62b1ffa5eb6e8cb578eb676c",
  fullName: "Marcial",
  username: "xXMarshallXx",
  password: "$2b$10$rptp8rQjdqE6PHThIbTgg.joB63C1BH0aDSm347J5W46AP7tARhie",
  __v: 0,
};

const USER_TOKEN_REGEX = /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/;

const LOGIN_REQUEST = {
  username: "xXMarshallXx",
  password: "pato",
};

const NEW_USER_REQUEST = {
  fullName: "Marshall",
  username: "xXMarshallXx",
  password: "pato",
};

module.exports = {
  GET_RETURN,
  GET_ONE_RETURN,
  MANY_BOOKS_RES,
  ONE_BOOK_RES,
  ONE_USER,
  LOGIN_REQUEST,
  USER_TOKEN_REGEX,
  NEW_USER_REQUEST,
};
