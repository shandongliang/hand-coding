// 二叉树遍历

//先序
function preorder(root) {
    if(!root){
        return
    }
    //先根
    console.log(root.val)
    preorder(root.left)
    preorder(root.right)
}

//中序
function inorder(root){
    if(!root){
        return
    }
    //先左
    inorder(root.left)
    console.log(root.val)
    //后右
    inorder(root.right)
}

//后序
function postorder(root) {
    if(!root){
        return
    }
    postorder(root.left)
    postorder(root.right)
    console.log(root.val)
}