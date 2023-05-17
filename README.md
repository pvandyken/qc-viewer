The built app is distributed in a tarfile under releases. To unpack it, navigate to the root directory of your dataset, download the tar file:

```
wget https://github.com/pvandyken/qc-viewer/releases/latest/download/build.tar.gz
```

and call:

```
tar -xzf build.tar.gz
```

There should now be a `qc/` folder and a file called `index.html` at the top level of your database.

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

## Building from scratch

After cloning the repository, build the app with:

```
npm install
npm run build
```

Copy the files from the `/build` folder into a folder called `/qc` at the root level of your dataset.

Add the `data.json` file as described above.
