import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/contants'
import Icon from '@/components/Icon'

const DailyBill = ({ date, billList }) => {
  // 计算总和，当月支出、收入、结余
  const dayResult = useMemo(() => {
    if (!Array.isArray(billList)) return { pay: 0, income: 0, total: 0 }
    // 支出
    const pay = billList.filter((item) => item.type === 'pay').reduce((last, current) => last + Math.abs(current.money), 0)
    // 收入
    const income = billList.filter((item) => item.type === 'income').reduce((last, current) => last + Math.abs(current.money), 0)
    return {
      pay,
      income,
      // 结余
      total: income - pay
    }
  }, [billList])

  // 控制显隐数据
  const [visible, setVisible] = useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header" onClick={() => setVisible(!visible)}>
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow', { expand: visible })}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className="billList" style={{ display: visible ? 'block' : 'none' }}>
        {billList.map((item) => {
          return (
            <div className="bill" key={item.id}>
              <Icon type={item.useFor}></Icon>
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>{item.money.toFixed(2)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default DailyBill
