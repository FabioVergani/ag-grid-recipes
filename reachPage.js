    reachPage = (pageN, callback) => {
        const api = this.gridApi?.api;
        if (api && !this.state.reachingPage) {
            this.setState({
                reachingPage: true // (prevent interactions)
            }, () => {
                const paginationChangedEvent = 'paginationChanged';
                const paginationChangedHandler = () => {
                    const n = api.paginationGetCurrentPage();
                    if (n < pageN) {
                        api.paginationGoToPage(pageN);
                    } else {
                        api.removeEventListener(
                            paginationChangedEvent,
                            paginationChangedHandler
                        );
                        this.setState({
                            reachingPage: false,
                        }, callback);
                    }
                };
                api.addEventListener(
                    paginationChangedEvent,
                    paginationChangedHandler
                );
            });
        }
    };
