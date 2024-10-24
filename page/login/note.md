git 项目分为
- 工作区⬇️：git add .
- 暂存区⬇️；git commit -m "版本注释"
- 版本库：当前版本库文件 git ls-files
  1. 同一条分支上的版本：git log --oneline
  2. 所有分支上的版本：git reflog --oneline

文件分为
- 已跟踪
- 未跟踪
 - 未跟踪 U
 - 新添加 A
 - 已修改 M

暂存区分使用
1. 恢复暂存区文件：git restore 文件路径
2. 删除暂存区文件：git rm --cached 文件路径

版本库
1. 保留软恢复：git reset --soft 版本号
2. 覆盖暂存区，保留工作区：git reset --mixed 版本号
3. 比对当前暂存区，同时覆盖暂存区和工作区：git hard --hard 版本号