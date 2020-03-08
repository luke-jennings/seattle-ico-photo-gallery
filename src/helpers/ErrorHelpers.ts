export class ErrorHelpers {

    /**
     * Toastr options for sticky notifications that have a close button.
     */
    public static GetToastrOptionsForPersistent(): ToastrOptions {
        // Setting timeOut and extendedTimeOut to 0 to make the toast notification sticky.
        return { extendedTimeOut: 0, timeOut: 0, closeButton: true  };
    }

    /**
     * Toastr options for slightly longer timeouts and the addition of a close button.
     */
    public static GetToastrOptionsForLongerTimeout(): ToastrOptions {
        
        return { timeOut: 8000, closeButton: true  };
    }
}