# Goalsetter MERN app

This is the goalsetter app from the [Learn the MERN Stack](https://www.youtube.com/watch?v=-0exw-9YJBo) series on YouTube.

## Usage

Rename the .envexample to .env and add your MONGO_URI

### Install dependencies

```
# Backend deps
npm install

# Frontend deps
cd frontend
npm install
```

### Run Server

```
npm run server
```

## git operation 

git  config  --global user.name "dustin.chen"
git  config  --global user.emmail "648023262@qq.com"

ssh keygen -t  rsa  -C "648023262@qq.com"
cat /c/users/[your_name]/.ssh/id_rsa.pub
ssh  -T git@github.com
git clone  https://github.com/stayyoungandsimple/dev_mern.git
cd  dev_mern

git add .
git commit -m "initial commit"
git push -u origin main
