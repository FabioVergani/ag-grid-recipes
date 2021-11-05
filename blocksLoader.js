const blockLoadedHandler = event => {
    const {startRow, endRow} = event.detail.block;
    const pageN = Math.floor(endRow/pageSize);
    console.log({lastPage,pageN});
    const stop = pageN >= lastPage;
    if (stop) {
        //...
        api.removeEventListener('modelUpdated',modelUpdateListener);
        this.setState({
            locked: false
        },() => {
            api.paginationGoToPage(lastPage);
        });
    } else {
        api.paginationGoToNextPage();
    }
};

window.addEventListener('blockLoaded',blockLoadedHandler);


const modelUpdateListener = event => {
    const cacheBlockState = event.api.getCacheBlockState();
    if (cacheBlockState) {
        for(const block of Object.values(cacheBlockState)){
            if ('loaded' === block.pageStatus) {
                window.dispatchEvent(
                    new CustomEvent('blockLoaded', {
                        detail: {
                            block: block
                        }
                    })
                );
            }
        }
    }
};

api.addEventListener('modelUpdated',modelUpdateListener);
