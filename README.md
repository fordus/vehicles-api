# Simple Motorcyle API in Deno 🦕

This is a simple API built with Deno that provides information about vehicles based on their manufacturing year.

## Available Routes

- GET /api/motorcycles/{year}

    Retrieves information about motorcycles manufactured in the specified year.

    Example: `/api/motorcycles/2022`

    Response:
    ```json
    {
        "make": "DUCATI",
        "models": [
            "1098S",
            "1199",
            "500 PANTAH",
            "M900",
            "M900/900 S",
            "MH900E",
            "MTS 620",
            "SUPER SPORT",
            "SUPER SPORT 1000 DS"
        ]
    }
    ```

## Getting Started

To run the API, make sure you have Deno installed on your machine. Then, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/surdle/vehicles-api.git
```

2. Navigate to the project directory:

```bash
cd vehicles-api
```

3. Run the API:

```bash
deno run --allow-net main.ts
```

The API will start running on `http://localhost:8000`.

