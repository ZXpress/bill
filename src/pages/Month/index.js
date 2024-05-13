import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './components/DayBill'

const Month = () => {
  // 按月数据分组
  const billList = useSelector((state) => state.bill.billList)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])
  // 控制时间选择弹窗打开关闭
  const [dateVisible, setDateVisible] = useState(false)

  const [currentMonthList, setMonthList] = useState([])
  // 计算总和，当月支出、收入、结余
  const monthResult = useMemo(() => {
    if (!Array.isArray(currentMonthList)) return { pay: 0, income: 0, total: 0 }
    // 支出
    const pay = currentMonthList.filter((item) => item.type === 'pay').reduce((last, current) => last + Math.abs(current.money), 0)
    // 收入
    const income = currentMonthList.filter((item) => item.type === 'income').reduce((last, current) => last + Math.abs(current.money), 0)
    return {
      pay,
      income,
      // 结余
      total: income - pay
    }
  }, [currentMonthList])
  // 确定关闭按钮
  const onConfirm = (date) => {
    setDateVisible(false)
    const formatDate = dayjs(date).format('YYYY-MM')
    // 获取当月数据
    setMonthList(monthGroup[formatDate])
    setCurrentDate(formatDate)
  }
  // 控制时间显示
  const [currentDate, setCurrentDate] = useState(() => {
    const formatDate = dayjs(new Date()).format('YYYY-MM')
    return formatDate
  })
  // 初始化显示当前月统计数据
  useEffect(() => {
    if (_.size(monthGroup)) {
      setMonthList(monthGroup[dayjs(new Date()).format('YYYY-MM')])
    }
  }, [monthGroup])

  // 当前月按日分组
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(groupData)
    return { groupData, keys }
  }, [currentMonthList])

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate}月账单</span>
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker onCancel={() => setDateVisible(false)} onConfirm={onConfirm} onClose={() => setDateVisible(false)} className="kaDate" title="记账日期" precision="month" visible={dateVisible} max={new Date()} />
        </div>
        <div className="body">
          {dayGroup.keys.map((key) => {
            return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]}></DailyBill>
          })}
        </div>
      </div>
    </div>
  )
}

export default Month
