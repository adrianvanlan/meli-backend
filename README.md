# Challenge MercadoLibre - API Backend

## Local

Requirements: Node >= 21

#### Install

```
npm install
```

#### Lint

```
npm run lint
```

#### Test

```
npm test
```

#### Development

```
npm run dev
```

#### API docs

```
http://localhost:5000/api-docs
```

&nbsp;
&nbsp;

## Docker

Requirements: Docker

#### Build

```sh
docker build -t meli-backend-image .
```

#### Run

```sh
docker run --name meli-api-container -p 5000:5000 meli-backend-image
```

#### API docs

```
http://localhost:5000/api-docs
```
