class Pig{
    
    constructor(
        public name: string, 
        public category: 'Grey' | 'Chestnut' | 'White' | 'Black', 
        public height: number, 
        public weight: number, 
        public personality: string,
        public breed: 'Iberian' | 'Hampshire' | 'Wattle' | 'Tammie' | 'Visayan',
        public swimming: number,
        public language: string,
        public run: number,
        public strength: number,


    )
    {
            this.name = name
            this.category = category
            this.height=height
            this.weight=weight
            this.personality= personality
            this.breed= breed
            this.swimming = swimming
            this.language= language
            this.run= run
            this.strength= strength
    }
}
export default Pig

