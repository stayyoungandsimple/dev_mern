## git operation 

* git  config  --global user.name "dustin.chen"
* git  config  --global user.emmail "648023262@qq.com"

* ssh keygen -t  rsa  -C "648023262@qq.com"
* cat /c/users/[your_name]/.ssh/id_rsa.pub
* ssh  -T git@github.com
* git clone  https://github.com/stayyoungandsimple/dev_mern.git
* cd  dev_mern

* git add .
* git commit -m "initial commit"
* git push -u origin main

* 我想把代码推送到vueVersion1分支，运行git push -u  origin vueVersion1，报错error: src refspec vueVersion1 does not match any error: failed to push some refs to 'https://github.com/stayyoungandsimple/dev_mern.git'
*  这个错误通常表示你本地的 vueVersion1 分支不存在，因此 Git 无法推送该分支到远程仓库。在执行 git push -u origin vueVersion1 命令之前，你需要先确保本地存在名为 vueVersion1 的分支。

* 首先，你可以通过以下命令查看当前所有的本地分支：git branch
* 如果 vueVersion1 分支不存在，你可以按照以下步骤创建并切换到该分支，然后再进行推送：
* 创建并切换到 vueVersion1 分支：git checkout -b vueVersion1
* 确认你已成功切换到 vueVersion1 分支：git branch
* 接着，将代码提交到 vueVersion1 分支：git add .
* git commit -m "Your commit message"
* 最后，执行推送操作：git push -u origin vueVersion1
* 这样就应该能够成功将 vueVersion1 分支推送到远程仓库了
* git clone -b vueVersion1 --single-branch https://github.com/stayyoungandsimple/dev_mern.git   # clone vueVersion1分支
