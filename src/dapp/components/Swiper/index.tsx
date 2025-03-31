// 这是一个图片轮播的组件 

/* // 实现图片懒加载
    const imgLeftRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(styles.visible);
                    }
                });
            },
            { threshold: 0.1 } // 当 10% 的元素进入视口时触发
        );

        if (imgLeftRef.current) {
            observer.observe(imgLeftRef.current);
        }

        return () => {
            if (imgLeftRef.current) {
                observer.unobserve(imgLeftRef.current);
            }
        };
    }, []);
    */
