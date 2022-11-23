import React from 'react'

function Icons() {
    return (
        <div className="flex gap-[1px] sm:gap-1">
            <img  alt="" src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" />
            <img  alt="" src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" />
            <img  alt="" src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" />
            <img className="hidden sm:block" alt="" src="https://js.stripe.com/v3/fingerprinted/img/diners-fbcbd3360f8e3f629cdaa80e93abdb8b.svg" />
        </div>
    )
}

export default Icons;