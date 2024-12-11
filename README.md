#参考文档
https://blog.csdn.net/qq_45796592/article/details/128953729

Git 项目分为
- 工作区⬇️：git add [工作区的改动文件名]
- 暂存区⬇️；git commit -m "版本注释" [工作区的改动文件名]
- 版本库：
  1. 同一条分支上的版本：git log --oneline
  2. 所有分支上的版本：git reflog --oneline

Git远程仓库
1. 本地Git仓库添加远程仓库原点地址：
   git remote add 远程仓库别名 远程仓库地址
2. 本地Git仓库首次推送版本记录到远程仓库（简写与完整写法）：
   git push -u 远程仓库别名 [本地分支名]:[远程分支名]
   git push --set-upstream 远程仓库别名 [本地分支名]:[远程分支名]
3. 查看当前远程仓库：git remote -v
4. 移出当前远程仓库：git remote remove 远程仓库别名
5. 代码从无到有 → 克隆远程仓库：git clone 远程仓库地址
6. 拉取（fetch）远程仓库最新代码：git pull 远程仓库别名 [远程分支名]:[本地分支名]
   非首次推送主分支最新代码：git push 远程仓库别名 [本地分支名]:[远程分支名]
   需求：A 将新代码共享给 B
   方法：
     A：工作区→暂存区→提交[→(未拉取至最新代码时，将推送冲突)→拉取（后，自动合并❗️）]→推送（远程仓库）
     B：拉取（后续也可以开发代码→...→推送）

GitHub Pages 在线静态网页部署
1. 初始化本地 Git 仓库（例如 dist 文件夹）
2. 初始化远程 Git 仓库（这一次包含 README.md 文件）
3. 本地配置远程仓库链接
4. 本地拉取合并一下（确认本地要包含远程内容时再使用，Mac 解决方法查看 flomo）
5. 本地推送到远程 Git 仓库
6. Github 仓库中找到 settings/pages 开启网页服务得到地址浏览
   - branch 分支选择 main
   - /(root) 即为整个根目录开放访问
   - 访问时手动拼接资源路径（/login），必要时修改传输协议 http

文件分为
- 已跟踪
- 未跟踪
 - 未跟踪 U
 - 新添加 A
 - 已修改 M

暂存区分使用
1. 恢复暂存区文件：git restore 文件路径
2. 删除暂存区文件：git rm --cached 文件路径
3. 查看暂存区文件：git ls-files

版本库
1. 保留软恢复：git reset --soft 版本号
2. 覆盖暂存区，保留工作区：git reset --mixed 版本号
3. 比对当前暂存区，同时覆盖暂存区和工作区：git hard --hard 版本号

忽略文件
1. 根目录新建‘.gitignore’文件
2. 直接写 文件（夹）名 即可，会自动忽略跟踪
3. 通常使用通配符 * .[后缀名] 来匹配某一类文件

分支
1. 场景：新需求（再提交）/修复Bug（删除）
2. 创建分支命令：git branch 分支名
3. 切换分支命令：git checkout 分支名
   创建并立刻切换分支：git checkout -b 分支名
4. 查看分支与当前分支：git branch
5. 开发分支项目时先创建并切换分支，再改动后提交版本库
6. HEAD 指针影响暂存区和工作区代码（切换分支时，文件也会恢复至当时）
7. 合并分支命令：git merge 分支名（先切换至主分支下）
8. 删除分支命令：git branch -d 分支名
9. 合并冲突
  - 原因：在 不同分支 中，对 同一个文件 的 同一部分 修改，Git无法干净的合并
  - 解决：在VScode中解决冲突后，重新提交版本库
10. 修改GitHub上的默认分支：https://blog.csdn.net/qyfx123456/article/details/129543324

常用命令
- 查看git版本：git -v
- 初始化git仓库：git init