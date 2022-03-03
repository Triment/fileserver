import { Pagination, Spacer } from '@geist-ui/core'
import { ChevronRight, ChevronLeft, ChevronRightCircle, ChevronLeftCircle, ChevronRightCircleFill, ChevronLeftCircleFill} from '@geist-ui/icons'
export default function () {
    return (
        <>
            <Pagination onChange={(i)=>console.log(i)} count={5}>
                <Pagination.Next><ChevronRightCircleFill /></Pagination.Next>
                <Pagination.Previous><ChevronLeftCircleFill /></Pagination.Previous>
            </Pagination>
        </>
    )
}