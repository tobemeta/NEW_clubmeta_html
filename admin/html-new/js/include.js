function unWrap(el) {
    // 요소를 언랩(unwrap)할 대상 요소를 선택합니다.
    var elementToUnwrap = el;

    // 요소의 부모 요소를 가져옵니다.
    var parentElement = elementToUnwrap.parentNode;

    // 자식 요소를 언랩할 요소의 위치로 이동시킵니다.
    while (elementToUnwrap.firstChild) {
        parentElement.insertBefore(elementToUnwrap.firstChild, elementToUnwrap);
    }

    // 언랩된 요소를 제거합니다.
    parentElement.removeChild(elementToUnwrap);
}

function includeHTML() {
    let z, elmnt, file, xhttp;

    z = document.getElementsByTagName('*');

    for (let i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute('data-include');

        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                        unWrap(elmnt);
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = 'Page not found.';
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute('data-include');
                    includeHTML();
                } //if
            }; //onreadystatechange

            xhttp.open('GET', file, true);
            xhttp.send();
            return;
        } //if - file
    } //for
} //includeHTML

/* ✨ 실행 */
window.addEventListener('DOMContentLoaded', () => {
    includeHTML();
});
