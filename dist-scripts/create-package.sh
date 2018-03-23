mkdir -p dist
rm -rf dist/*
cd build
npm install --production
zip -r deployment-package ./
mv deployment-package.zip ../dist