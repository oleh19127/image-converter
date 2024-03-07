# Image-Converter

Image Converter is a versatile tool designed to simplify image processing tasks. With its user-friendly interface and powerful capabilities, the application allows users to effortlessly:

Convert Images to Various Formats: Seamlessly convert images from one format to another, offering flexibility in managing your image assets.

Resize Images with Precision: Easily resize images to specific dimensions while preserving their aspect ratio, providing control over the size of your visuals.

Sort Converted Images by Extension: Organize your converted images systematically by their file extensions, streamlining the categorization and retrieval process.

## Features

- Format conversion: Convert images to various popular image formats like JPEG, PNG, GIF, etc.
- Image resizing: Resize images to desired dimensions, preserving aspect ratio.
- Organized output: Sort converted images by their resulting extensions, making file management easier.

## Requirements

- Nodejs: "18.x"

- [ImageMagick](https://imagemagick.org/script/convert.php)

## How To Use

1.  <pre>git clone https://github.com/oleh19127/image-converter.git .; rm -rf trunk .gitignore readme.md .git .gitattributes</pre>

1.  Write in the terminal:

    - Install Node Modules: **pnpm i**

    - Run for development: **pnpm dev**

    - Run for production: **pnpm start**

1.  Put all photos that need to be converted into images/source-images(folder and file names must be without "spaces" and "()")

1.  The result is put into images/converted images

## Default configuration

- Extensions: ['webp', 'avif']

- Widths: ['1920', '1440', '1024', '768', '425'];

- 10 photos are processed simultaneously
