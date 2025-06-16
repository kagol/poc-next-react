import { useState, useContext } from 'react'
import { z } from 'zod'
import { useNextServer, McpContext } from '@opentiny/next-react'

function MyPage() {
  const defaultCompanyList = [
    {
      id: '1',
      name: 'GFD 科技 YX 公司',
      city: '福州',
      employees: 800,
      createdDate: '2014-04-30 00:56:00',
      checked: false,
    },
    {
      id: '2',
      name: 'WWW 科技 YX 公司',
      city: '深圳',
      employees: 300,
      createdDate: '2016-07-08 12:36:22',
    },
    {
      id: '3',
      name: 'RFV 有限责任公司',
      city: '中山',
      employees: 1300,
      createdDate: '2014-02-14 14:14:14',
    },
    {
      id: '4',
      name: 'TGB 科技 YX 公司',
      city: '龙岩',
      employees: 360,
      createdDate: '2013-01-13 13:13:13'
    },
    {
      id: '5',
      name: 'YHN 科技 YX 公司',
      city: '韶关',
      employees: 810,
      createdDate: '2012-12-12 12:12:12'
    },
    {
      id: '6',
      name: 'WSX 科技 YX 公司',
      city: '黄冈',
      employees: 800,
      createdDate: '2011-11-11 11:11:11'
    },
    {
      id: '7',
      name: 'KBG 物业 YX 公司',
      city: '赤壁',
      employees: 400,
      createdDate: '2016-04-30 23:56:00',
    },
    {
      id: '8',
      name: '深圳市福德宝网络技术 YX 公司',
      city: '厦门',
      createdDate: '2016-06-03 13:53:25',
      employees: 540
    },
    {
      id: '9',
      name: '深圳市菊厂有限公司',
      city: '深圳',
      createdDate: '2018-06-03 13:53:25',
      employees: 10000
    }
  ]

  const [companyList, setCompanyList] = useState(defaultCompanyList)

  const setSelected = (id: string, selected: boolean) => {
    setCompanyList((prevList) =>
      prevList.map(company =>
        company.id === id ? { ...company, checked: selected } : company
      )
    )
  }

  const { transport } = useContext(McpContext) as any
  const { server } = useNextServer({
    transport,
    serverInfo: { name: 'my-page', version: '1.0.0' },
  })

  server.tool('set_selected', '选中一家公司', {
    id: z.string().describe('公司 ID'),
    selected: z.boolean().describe('是否选中')
  }, async ({ id, selected }) => {
    console.log('set_selected called')
    setSelected(id, selected)
    return {
      content: [
        {
          type: 'text',
          text: 'success'
        }
      ]
    }
  })

  return (
    <>
      <h3>公司列表</h3>
      <ul>
        {companyList.map((company) => (
          <li key={company.id}>
            <input
              type="checkbox"
              checked={company.checked}
              onChange={(e) => setSelected(company.id, e.target.checked)}
            />
            <span className="space">{company.id}</span>
            <span className="space">{company.name}</span>
            <span className="space">{company.city}</span>
            <span className="space">{company.employees}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default MyPage
