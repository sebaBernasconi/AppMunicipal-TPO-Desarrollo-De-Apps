import React from 'react'
import StyledText from "../styledComponents/StyledText";

export default function ErrorMessage({errorCode, errorMessage}) {
    return (
        <>
            <StyledText capitalized>
                Error code: {errorCode}
            </StyledText>
            <StyledText capitalized>
                {errorMessage.split("_").join(" ")}
            </StyledText>
        </>
    )
}
