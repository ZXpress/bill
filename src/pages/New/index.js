import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 支出收入状态切换pay income
  const [billType, setBillType] = useState('pay')
  const [money, setMoney] = useState(0)
  const moneyChange = (value) => {
    setMoney(value)
  }
  const [useFor, setUseFor] = useState('')
  // 保存账单
  const saveBill = () => {
    const data = {
      type: billType,
      money: billType === 'pay' ? -money : +money,
      date: date,
      useFor: useFor
    }
    dispatch(addBillList(data))
    navigate('/month')
  }
  // 控制时间显示隐藏
  const [dateVisible, setDateVisible] = useState(false)
  const [date, setDate] = useState(new Date())
  const dateConfirm = (value) => {
    setDate(value)
    setDateVisible(false)
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button onClick={() => setBillType('pay')} shape="rounded" className={classNames(billType === 'pay' && 'selected')}>
            支出
          </Button>
          <Button onClick={() => setBillType('income')} className={classNames(billType === 'income' && 'selected')} shape="rounded">
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={() => setDateVisible(true)}>
              <Icon type="calendar" className="icon" />
              <span className="text">{dayjs(date).format('YYYY-MM-DD')}</span>
              <DatePicker visible={dateVisible} onConfirm={dateConfirm} className="kaDate" title="记账日期" max={new Date()} />
            </div>
            <div className="kaInput">
              <Input className="input" placeholder="0.00" type="number" value={money} onChange={moneyChange} />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      {/* 数据显示 */}
      <div className="kaTypeList">
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div className={classNames('item', '', { selected: useFor === item.type })} key={item.type} onClick={() => setUseFor(item.type)}>
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button onClick={saveBill} className="btn save">
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New
