npm install
npm test
npm run compile
npm run copy-package
cd build
npm install --production
zip -r deployment-package ./
mv deployment-package.zip ../