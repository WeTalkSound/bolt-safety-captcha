import React from 'react'

export default function SocialShare({url, text, tag}) {
    return (
        <div className="col-sm-12 share-btns px-0 my-3">
            <a
                href={"https://www.facebook.com/sharer/sharer.php?u=" + url + "&quote=" + encodeURI(text) + " #" + tag + ""}
                // className="social mb-2 facebook btn-floating"
                className="social mb-2 facebook btn"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-facebook"></i> Facebook
            </a>
            &nbsp;
            <a
                href={"https://twitter.com/intent/tweet?text=" + encodeURI(text) + "&url=" + url + "&hashtags=" + tag + ""}
                // className="social mb-2 twitter btn-floating"
                className="social mb-2 twitter btn"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-twitter"></i> Twitter
            </a>
            &nbsp;
            <a
                href={"whatsapp://send?text=" + encodeURI(text) + " " + url + ""}
                // className="social mb-2 whatsapp btn-floating"
                className="social mb-2 whatsapp btn"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-whatsapp"></i> WhatsApp
            </a>
            &nbsp;
        </div>
    )
}