/**
 *1. 给定一个整数数组 nums 和一个目标值 target，
 * 请你在该数组中找出和为目标值的那 两个 整数，
 * 并返回他们的数组下标。
 */


// 几乎所有的求和问题，都可以转化为求差问题
// 空间换时间
function q1(nums, targetNum){
    let newMap = {}
    for(let i = 0; i < nums.length; i++){
        // 判断当前值对应的 target 差值是否存在（是否已遍历过）
        if(newMap[targetNum - nums[i]] !== undefined){
            // 若有对应差值，那么答案get！
            return [newMap[targetNum - nums[i]], i]
        }
        // 若没有对应差值，则记录当前值
        newMap[nums[i]] = i
    }
}


/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 
 * 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 */

// 双指针,一方面，它可以做到空间换时间；另一方面，它也可以帮我们降低问题的复杂度
function q2 (nums1, m, nums2, n){
    let i = m - 1, j = n - 1, k = m + n - 1
    while(i >= 0 && j >= 0){
        // 取较大的值，从末尾往前填补
        if(nums1[i] >= nums2[j]){
            nums1[k] = nums1[i]
            k--
            i--
        } else {
            nums1[k] = nums2[j]
            k--
            j--
        }
    }
    // nums2 留下的情况，特殊处理一下 
    while(j >= 0){
        nums1[k] = nums2[j]
        k--
        j--
    }
}


/**
 * 给你一个包含 n 个整数的数组 nums，
 * 判断 nums 中是否存在三个元素 a，b，c ，
 * 使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 */


//双指针法用在涉及求和、比大小类的数组题目里时，大前提往往是：该数组必须有序

function q3(nums){
    
}