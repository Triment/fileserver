import { Fieldset } from '@geist-ui/core'
export default function (props) {
    return (
        <>
            <Fieldset>
                <Fieldset.Title>{props.title}</Fieldset.Title>
                <Fieldset.Subtitle>{props.subTitle}</Fieldset.Subtitle>
                <Fieldset.Footer>
                    {props.footer}
                </Fieldset.Footer>
            </Fieldset>
        </>
    )
}