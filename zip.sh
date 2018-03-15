npm run compile
npm run copy-package
cd build
npm install --production
rm ./*.json
zip -r deployment-package ./
mv deployment-package.zip ../