import $ from 'jquery';



export function disabled_button(id) {
    $("#" + id).addClass('disabled');
    $("#" + id).prop("disabled", true);
}

export function enabled_button(id) {
    $("#" + id).removeClass('disabled');
    $("#" + id).prop("disabled", false);
}

export function Onprogres(id) {

}

export function onDone(id) {

}
