import Model from './Model'
import { SkillData } from '../structures'

export default class Skill extends Model<SkillData> {
  get desc (): SkillData['desc'] {
    return this.data.desc
  }

  get abilityScore (): SkillData['ability_score'] {
    return this.data.ability_score
  }
}
