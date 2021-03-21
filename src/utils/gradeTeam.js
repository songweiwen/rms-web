export const getGradeTeam = function (setObj) {
  // const grade = grade || 7
  // const team = team || 30
  // console.log(setObj, '获取年级配置')

  let obj = { grade: 7, team: 30, gradeText: '年级', teamText: '班' }
  if (setObj) {
    obj = Object.assign(obj, setObj)
  }

  const text = obj.gradeText.replace('年级', '')
  console.log(obj, '获取年级配置')
  const gradeArr = [{ text: '幼儿园' + text, val: 0 }]
  const teamArr = []
  for (let i = 0; i < obj.grade; i++) {
    const val = i + 1
    // console.log(i, '年级')
    gradeArr.push({ text: val + (obj.gradeText || '年级'), val })
  }
  for (let j = 0; j < obj.team; j++) {
    const val = j + 1
    // console.log(j, '班级')
    teamArr.push({ text: val + (obj.teamText || '班'), val })
  }
  console.log(gradeArr, teamArr)
  return { gradeArr, teamArr }
}
