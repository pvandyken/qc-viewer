Build the app with:

```
npm install
npm run build
```

Copy the files from the `/build` folder into a folder called `/qc` at the root level of your dataset.

Put a file called `data.json` in the `/qc` folder. Its schema should be as follows:

```
{
    "<slug>": {
        "title": "<title>",
        "images": [
            "root/path/too/image1.png",
            ...
        ]
    },
    ...
}
```

Image paths must be relative to the root of the dataset.

Serve the app with:

```
python -m http.server
```

Navigate to the `/qc` path.