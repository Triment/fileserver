import { Button, Input, Spacer, Collapse, Text, Badge, useModal, Modal } from '@geist-ui/core';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Phone } from '@geist-ui/icons'


const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`
const ScrollView = styled.div`
    height: 20rem;
    overflow-y: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
`

export default function () {
    const [phone, setPhone] = useState()
    const [roles, setRoles] = useState([])
    const { setVisible, bindings } = useModal()
    const apiUrl = process.env.REACT_APP_HOST

    const click = (e) => {
        fetch(`http://${apiUrl}:4567/checkout/${phone}`).then(data => data.json()).then(d => {
            setRoles(d.data)
            console.log(d.data.length)
            if(d.data.length === 0) {
                setVisible(true)
                setTimeout(() => {
                    setVisible(false)
                }, 2000);
            }
        })
    }
    return (
        <Row style={{ justifyContent: 'center' }}>
            <Column style={{ justifyContent: 'center' }}>
                <Row style={{ justifyContent: 'center', flex: 2 }} >
                    <Column style={{ justifyContent: 'center', position: 'relative' }}>
                        <Input style={{ minHeight: '200px' }} placeholder='输入手机号点击查询' onChange={e => setPhone(e.currentTarget.value)} label={<Phone />} />
                        <Spacer h={.5} />
                        <Button onClick={click} type='success'>查询</Button>
                        <Spacer h={.5} />
                    </Column>
                </Row>
                
                <ScrollView style={{ flex: 8 }}>
                {roles.map(ele => {
                    return (<Column>
                        名字:&nbsp; {ele.mdpEmp.empName}<br />
                        集团工号:&nbsp; {ele.mdpEmp.empCode}<br />
                        最后更新人:&nbsp; {ele.mdpEmp.updatedBy}<br />
                        <Collapse.Group>
                            {
                                ele.mdpOrgBases.map((item, i) => {
                                    return <Collapse
                                        title={`岗位${i+1}: ${item.positionName}`}
                                        subtitle={<>
                                            <Badge style={{ display: item.sourceType === 1 ? 'inline-block' : 'none' }} >HR</Badge>
                                            <Badge style={{ backgroundColor: '#895ff3',display: item.sourceType === 2 ? 'inline-block' : 'none' }} >新乾坤</Badge>
                                            <Badge style={{ backgroundColor: '#FFB200', display: item.sourceType === 3 ? 'inline-block' : 'none' }} >银河</Badge>
                                        </>}>
                                        <Text>
                                            组织机构:&nbsp;{item.orgName}<br />
                                            上级:&nbsp;{item.parentOrgName}<br />
                                            组织路径:&nbsp;{item.orgFullName}<br />
                                            省区:&nbsp;{item.affiliatedOrgName}<br />
                                            最后更新:&nbsp;{item.updatedBy}<br />
                                            职位:&nbsp;{item.positionName}
                                        </Text>
                                    </Collapse>
                                })
                            }
                        </Collapse.Group>
                    </Column>)
                })}
                </ScrollView>
            </Column>
            <Modal width="35rem" {...bindings}>
                <Modal.Title>{phone}查询无结果</Modal.Title>
                <Modal.Content>
                <p>这说明这个手机号是未在公司使用过的！</p>
                </Modal.Content>
            </Modal>
        </Row>
    )
}

