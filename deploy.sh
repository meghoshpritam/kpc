yarn
hugo --minify
[ ! -d "./build" ] && git clone git@github.com:meghoshpritam/kpc.git build
cd build
git checkout build-prod
rm -rf public
cp ../public ./public -r
git add .
git commit -m "new update"
git push origin -u build-prod
cd ..
