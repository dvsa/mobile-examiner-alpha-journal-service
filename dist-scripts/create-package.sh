rm -rf dist/*
mkdir dist
cd build
npm install --production
zip -r deployment-package ./
mv deployment-package.zip ../dist