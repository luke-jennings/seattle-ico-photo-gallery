export class ErrorHelpers {

    /**
     * Toastr options for sticky notifications that have a close button.
     */
    public static GetToastrOptions(): ToastrOptions {
        // Setting timeOut and extendedTimeOut to 0 to make the toast notification sticky.
        return { extendedTimeOut: 0, timeOut: 0, closeButton: true  }
    }
}