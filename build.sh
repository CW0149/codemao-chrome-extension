rm -rf build
npx webpack --config webpack.config.js
cp -r public/* build

cd build
zip -r ../../codemao-public/codemao.zip ./*
cd ..