import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import OfferFilters from 'App/Models/OfferFilters'

export default class OfferFilterFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof OfferFilters, OfferFilters>

  // public method (value: any): void {
  //   this.$query.where('name', value)
  // }
}
