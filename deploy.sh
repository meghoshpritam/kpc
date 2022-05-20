git clone git@github.com:meghoshpritam/kpc.git build
cd build
rm -rf public
git checkout build-prod
cp ../public ./public -r
git commit -m "new update"
git push origin -u build-prod
cd ..
rm -rf build